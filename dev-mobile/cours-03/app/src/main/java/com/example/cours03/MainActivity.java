package com.example.cours03;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.view.View;
import android.widget.EditText;
import android.widget.ListView;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    private static SharedPreferences prefs;
    private static EditText textInput;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ListView list = (ListView) findViewById(R.id.LIST);
        ArrayList<TodoItem> items = new ArrayList<TodoItem>();
        for (int i = 0; i < 40; i++) items.add(new TodoItem("item " + i, false));
        CustomAdapter adapter = new CustomAdapter(this, items);
        list.setAdapter(adapter);
        prefs = PreferenceManager.getDefaultSharedPreferences(getApplicationContext());
        textInput = (EditText) findViewById(R.id.NAME_INPUT);
    }

    public void onSaveClick(View v) {
        SharedPreferences.Editor editor = prefs.edit();
        editor.putString("name", textInput.getText().toString());
        editor.commit();
    }

    public void onLoadClick(View v) {
        textInput.setText(prefs.getString("name", "John").toString());
    }

    public void onPrefClick(View v) {
        Intent intent = new Intent(getApplicationContext(), MySettingsActivity.class);
        startActivity(intent);
    }
}
