package com.example.cours04;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.util.Log;

public class MainActivity extends AppCompatActivity {

    private static String DEBUG_TAG = "DEBUG_TAG";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        String path = Environment.getExternalStorageDirectory().getPath() + "/Download/video.mp4";
        Intent action = new Intent(Intent.ACTION_VIEW);
        action.setDataAndType(Uri.parse(path), "video/mp4");

        if (action.resolveActivity(getPackageManager()) != null) {
            startActivity(action);
        }
    }
}