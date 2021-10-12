package com.example.coursdevandroid;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import java.util.Locale;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = "SUS";
    private static String inputText = "";
    private Integer counter = 3;
    private TextView mainTextView;
    private EditText mainTextInput;
    private TextView counterTextView;
    private static TextWatcher tw;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.v(TAG, "onCreate");

        setContentView(R.layout.activity_main);

        mainTextView = findViewById(R.id.INPUT_TEXT);
        counterTextView = findViewById(R.id.COUNTER_TEXT);
        mainTextInput = findViewById(R.id.TEXT_EDIT);

        inputText = mainTextInput.getText().toString();

        if (savedInstanceState != null) {
            counter = savedInstanceState.getInt("Counter");
        }

        updateCounterText();
        updateInputText();

        tw = new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {
            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                inputText = s.toString();
                updateInputText();
            }

            @Override
            public void afterTextChanged(Editable s) {
            }
        };

        mainTextInput.addTextChangedListener(tw);
    }

    public void onClickAddOne(View v) {
        counter++;
        updateCounterText();
    }

    private void updateInputText() {
        mainTextView.setText(inputText);
    }

    private void updateCounterText() {
//        counterTextView.setText(counter.toString());
        counterTextView.setText(String.format(Locale.FRANCE,"%d", counter));
    }

    @Override
    protected void onStart() {
        super.onStart();
        Log.v(TAG, "onStart");
    }

    @Override
    protected void onPause() {
        super.onPause();
        Log.v(TAG, "onPause");
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.v(TAG, "onResume");
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        Log.v(TAG, "onRestart");
    }

    @Override
    public void onSaveInstanceState(@NonNull Bundle outState) {
        super.onSaveInstanceState(outState);
        Log.v(TAG, "onSaveInstanceState");
        outState.putInt("Counter", counter);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.v(TAG, "onDestroy");
        mainTextInput.removeTextChangedListener(tw);
    }
}