package com.mohamed.fine.ProGallery
import android.Manifest
import android.Manifest.permission.READ_MEDIA_IMAGES
import android.Manifest.permission.READ_MEDIA_VIDEO
import android.provider.Settings
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.OperationCanceledException
import expo.modules.core.errors.ModuleNotFoundException
import expo.modules.interfaces.permissions.Permissions
import expo.modules.interfaces.permissions.PermissionsStatus
import expo.modules.kotlin.Promise
import expo.modules.kotlin.activityresult.AppContextActivityResultLauncher
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.suspendCancellableCoroutine
import kotlinx.coroutines.withContext


import android.os.Environment

import android.widget.Toast 

import java.io.File

class MyModule : Module() {

  val context: Context
    get() = requireNotNull(appContext.reactContext) { "React Application Context is null" }

        
    
    override fun definition() = ModuleDefinition {
   

      
    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("requestPermission") {

      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
        if (!Environment.isExternalStorageManager()) {
            val intent = Intent(Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION)
            val uri = Uri.fromParts("package", context.packageName, null)
            intent.data = uri
            context.startActivity(intent)
        }else {
          Toast.makeText(context,"already have permission", Toast.LENGTH_SHORT).show()
        }
    }
    }

    Function("sayThink"){
      text : String -> "hello in your $text"

  }

 


  }

}








