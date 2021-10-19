package com.example.cours03;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.ListView;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ListView list = (ListView) findViewById(R.id.LIST);
        ArrayList<TodoItem> items = new ArrayList<TodoItem>();
        for (int i = 0; i < 40; i++) items.add(new TodoItem("item " + i, false));
        CustomAdapter adapter = new CustomAdapter(this, items);
        list.setAdapter(adapter);
    }
}