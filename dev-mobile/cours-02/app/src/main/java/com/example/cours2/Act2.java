package com.example.cours2;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.webkit.WebView;

public class Act2 extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_act2);
        WebView webview = (WebView) findViewById(R.id.WEB_VIEW);
        webview.getSettings().setJavaScriptEnabled(false);
        webview.loadUrl("https://www.google.com");
    }
}