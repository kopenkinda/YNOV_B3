package com.example.cours2;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {

    private static String TAG = "SUS";
    private Button goButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        goButton = (Button) findViewById(R.id.GO_BUTTON);
        goButton.setOnClickListener(v -> {
            Intent intent = new Intent(this, Act2.class);
            startActivity(intent);
        });

    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }

    @Override
    public void onBackPressed() {
        new AlertDialog.Builder(this)
                .setTitle("BRUH")
                .setMessage("You leavin' huh?")
                .setPositiveButton("What about it?", (dialog, which) -> finish())
                .setNegativeButton("I'm sorry", null)
                .show();
    }
}