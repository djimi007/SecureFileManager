package expo.modules.permissionmodule.newone

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition


import android.os.Build
import android.os.Environment
import android.provider.Settings
import android.content.Intent
import android.net.Uri
import android.widget.Toast


class PermissionModule : Module() {


  private val context
    get() = requireNotNull(appContext.reactContext) {
      "React Application Context is null"
    }

  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('PermissionModule')` in JavaScript.
    Name("PermissionModule")

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
    Constants(
      "PI" to Math.PI
    )

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      "Hello world! 👋"
    }
    Function("requestPermission") {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
        if (!Environment.isExternalStorageManager()) {
          val intent = Intent(Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION)
          val uri = Uri.fromParts("package", context.packageName, null)
          intent.data = uri
          intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
          context.startActivity(intent)
          return@Function false
        } else {
          Toast.makeText(context, "Already have permission", Toast.LENGTH_SHORT).show()
          return@Function true
        }
      }
      return@Function true
    }


    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { value: String ->
      // Send an event to JavaScript.
      sendEvent("onChange", mapOf(
        "value" to value
      ))
    }

    // Enables the module to be used as a native view. Definition components that are accepted as part of
    // the view definition: Prop, Events.
    View(PermissionModuleView::class) {
      // Defines a setter for the `name` prop.
      Prop("name") { view: PermissionModuleView, prop: String ->
        println(prop)
      }
    }
  }
}
