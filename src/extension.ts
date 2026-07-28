import * as vscode from "vscode";
let statusItem: vscode.StatusBarItem;
let projectListener: vscode.Disposable | undefined;
let timer: NodeJS.Timeout | undefined;
export async function activate(context: vscode.ExtensionContext) {
    statusItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
        1000
    );
    statusItem.tooltip = "Active CMake Configure Preset";
    context.subscriptions.push(statusItem);
    const cmakeExtension =
        vscode.extensions.getExtension("ms-vscode.cmake-tools");
    if (!cmakeExtension) {
        statusItem.text = "❌ CMake Tools missing";
        statusItem.show();
        return;
    }
    await cmakeExtension.activate();
    const api = cmakeExtension.exports.getApi();

    function update() {
        const project =
            api.manager.projectController.getActiveCMakeProject();
        if (!project) {
            statusItem.text = "❌ No CMake project";
            statusItem.backgroundColor = undefined;
            statusItem.show();
            return;
        }
        const preset = project.configurePreset;
        if (!preset) {
            statusItem.text = "⚪ No preset";
            statusItem.backgroundColor = undefined;
        }
        else {
            statusItem.text =
                preset.displayName ?? preset.name;
            if (
                preset.name?.toLowerCase().includes("debug") ||
                preset.displayName?.toLowerCase().includes("debug")
            ) {
                statusItem.backgroundColor =
                    new vscode.ThemeColor(
                        "statusBarItem.warningBackground"
                    );
            }
            else {
                statusItem.backgroundColor = undefined;
            }
        }
        statusItem.show();
    }

    function attachProjectListener() {
        // Remove previous listener
        projectListener?.dispose();
        const project =
            api.manager.projectController.getActiveCMakeProject();
        if (!project) {
            return;
        }
        projectListener =
            project.onActiveConfigurePresetChanged(() => {
                update();
            });
    }

    // Initial update
    update();
    // Attach CMake preset change listener
    attachProjectListener();

    // Safety refresh:
    // CMake Tools sometimes recreates the project object internally.
    timer = setInterval(() => {
        update();
        attachProjectListener();
    }, 1000);

    // Cleanup
    context.subscriptions.push({
        dispose() {
            if (timer) {
                clearInterval(timer);
            }
            projectListener?.dispose();
        }
    });
}

export function deactivate() {}