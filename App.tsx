import React, { useState } from 'react';
import { Copy, Check, Smartphone, FileCode2, Info, Code2 } from 'lucide-react';

const CodeBlock = ({ code, language, filename }: { code: string, language: string, filename: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-8 overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-700 bg-slate-800 px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
          <FileCode2 className="h-4 w-4" />
          {filename}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md bg-slate-700 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-600 hover:text-white transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm text-slate-300 font-mono leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
              <Smartphone className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Fake Camera Video Picker</h1>
              <p className="text-sm text-slate-500">Android 10 Intent Interceptor Guide</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
            <Code2 className="h-4 w-4" />
            Kotlin + XML
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-10 bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-emerald-900 mb-2 flex items-center gap-2">
            <Info className="h-5 w-5" />
            How this works
          </h2>
          <p className="text-emerald-800 leading-relaxed">
            Since I am an AI that builds web applications, I cannot directly compile an Android APK for you. However, I have generated the exact Android Studio code you need to build this app yourself. 
            <br/><br/>
            This Android app registers itself as a camera app. When another app requests to record a video (using <code className="bg-emerald-100 px-1.5 py-0.5 rounded text-emerald-900 text-sm font-mono">ACTION_VIDEO_CAPTURE</code>), your app will appear in the chooser dialog. If selected, instead of opening a camera, it opens the device's gallery. Once a video is selected, it copies the video to the requesting app's output URI and returns it.
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-4">1. The Manifest</h3>
            <p className="text-slate-600 mb-4">
              We need to declare our Activity and add an intent filter for <code className="bg-slate-200 px-1.5 py-0.5 rounded text-sm font-mono text-slate-800">android.media.action.VIDEO_CAPTURE</code>.
              We also use a transparent theme so the app feels like a dialog rather than a full-screen app.
            </p>
            <CodeBlock 
              filename="AndroidManifest.xml"
              language="xml"
              code={manifestCode}
            />
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-4">2. The Transparent Theme</h3>
            <p className="text-slate-600 mb-4">
              Add this to your <code className="bg-slate-200 px-1.5 py-0.5 rounded text-sm font-mono text-slate-800">res/values/themes.xml</code> or <code className="bg-slate-200 px-1.5 py-0.5 rounded text-sm font-mono text-slate-800">styles.xml</code> to make the activity invisible while it launches the gallery.
            </p>
            <CodeBlock 
              filename="res/values/themes.xml"
              language="xml"
              code={themeCode}
            />
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-4">3. The Main Activity</h3>
            <p className="text-slate-600 mb-4">
              This is the core logic. It intercepts the intent, opens the gallery, and when a video is picked, it copies the video data to the requested output URI.
            </p>
            <CodeBlock 
              filename="MainActivity.kt"
              language="kotlin"
              code={activityCode}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

const manifestCode = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.fakecamera">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="Gallery Camera"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.Transparent">

        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:theme="@style/Theme.Transparent">
            
            <!-- Intercept Video Capture Requests -->
            <intent-filter>
                <action android:name="android.media.action.VIDEO_CAPTURE" />
                <category android:name="android.intent.category.DEFAULT" />
            </intent-filter>
            
            <!-- Optional: Also intercept Image Capture -->
            <intent-filter>
                <action android:name="android.media.action.IMAGE_CAPTURE" />
                <category android:name="android.intent.category.DEFAULT" />
            </intent-filter>

        </activity>
    </application>

</manifest>`;

const themeCode = `<resources>
    <!-- Base application theme. -->
    <style name="Theme.FakeCamera" parent="Theme.MaterialComponents.DayNight.NoActionBar">
        <item name="colorPrimary">@color/purple_500</item>
        <item name="colorPrimaryVariant">@color/purple_700</item>
        <item name="colorOnPrimary">@color/white</item>
    </style>

    <!-- Transparent theme for the interceptor activity -->
    <style name="Theme.Transparent" parent="Theme.FakeCamera">
        <item name="android:windowIsTranslucent">true</item>
        <item name="android:windowBackground">@android:color/transparent</item>
        <item name="android:windowContentOverlay">@null</item>
        <item name="android:windowNoTitle">true</item>
        <item name="android:windowIsFloating">true</item>
        <item name="android:backgroundDimEnabled">false</item>
    </style>
</resources>`;

const activityCode = `package com.example.fakecamera

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    companion object {
        private const val PICK_MEDIA_REQUEST = 1001
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Check if we were launched via a camera intent
        when (intent.action) {
            MediaStore.ACTION_VIDEO_CAPTURE -> openGallery("video/*")
            MediaStore.ACTION_IMAGE_CAPTURE -> openGallery("image/*")
            else -> {
                // App opened normally from launcher, just finish
                finish()
            }
        }
    }

    private fun openGallery(mimeType: String) {
        val galleryIntent = Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI)
        galleryIntent.type = mimeType
        startActivityForResult(galleryIntent, PICK_MEDIA_REQUEST)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        
        if (requestCode == PICK_MEDIA_REQUEST) {
            if (resultCode == Activity.RESULT_OK && data != null) {
                val selectedMediaUri: Uri? = data.data
                
                val resultIntent = Intent()
                resultIntent.data = selectedMediaUri
                
                // Many apps provide EXTRA_OUTPUT expecting the camera to write the file there.
                // We must copy the selected gallery file to this requested output URI.
                val outputUri = intent.getParcelableExtra<Uri>(MediaStore.EXTRA_OUTPUT)
                if (outputUri != null && selectedMediaUri != null) {
                    copyMediaToOutput(selectedMediaUri, outputUri)
                }
                
                setResult(Activity.RESULT_OK, resultIntent)
            } else {
                setResult(Activity.RESULT_CANCELED)
            }
            finish()
        }
    }

    /**
     * Copies the selected file from the gallery to the URI provided by the calling app.
     */
    private fun copyMediaToOutput(sourceUri: Uri, destUri: Uri) {
        try {
            contentResolver.openInputStream(sourceUri)?.use { input ->
                contentResolver.openOutputStream(destUri)?.use { output ->
                    input.copyTo(output)
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
}`;
