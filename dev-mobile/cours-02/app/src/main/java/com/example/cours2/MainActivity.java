package com.example.cours2;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private static String TAG = "SUS";
    private Button goButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        goButton = (Button)findViewById(R.id.GO_BUTTON);
        // 1
        goButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.v(TAG, "View.OnClickListener");
            }
        });
        // 1.5
        goButton.setOnClickListener(v -> {
            Log.v(TAG, "v -> ");
        });

    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        // 2
        goButton.setOnClickListener(null);
    }

    public void onClickXML(View v) {
        Log.v(TAG, "onClickXML");
    }

    @Override
    public void onClick(View v) {
        // 3
        Log.v(TAG, "onClick override");
    }
}