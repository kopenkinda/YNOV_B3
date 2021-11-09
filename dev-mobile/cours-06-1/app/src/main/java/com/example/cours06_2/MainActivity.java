package com.example.cours06_2;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;

public class MainActivity extends AppCompatActivity {

    EditText input;
    Button load;
    Button save;
    DBHelper dbhelper;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        dbhelper = new DBHelper(this);

        input = findViewById(R.id.TEXT_INPUT);
        load = findViewById(R.id.LOAD_BUTTON);
        save = findViewById(R.id.SAVE_BUTTON);

        load.setOnClickListener(v -> {
            String data = dbhelper.readData();
            Log.v("APP", data);
            input.setText(data);
        });
        save.setOnClickListener(v -> {
            String text = input.getText().toString();
            if (text.trim().length() > 0) {
                dbhelper.insertData(text);
                input.setText("");
            }
        });
    }
}