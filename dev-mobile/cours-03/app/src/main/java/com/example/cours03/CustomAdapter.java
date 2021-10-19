package com.example.cours03;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Switch;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import java.util.ArrayList;

public class CustomAdapter extends ArrayAdapter<TodoItem> {

    public CustomAdapter(@NonNull Context context, ArrayList<TodoItem> items) {
        super(context, 0, items);
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        TodoItem item = getItem(position);
        if (convertView == null) {
            convertView = LayoutInflater.from(getContext()).inflate(R.layout.simple_list_item_1, parent, false);
        }

        TextView textView = convertView.findViewById(R.id.textView);
        Switch sw = convertView.findViewById(R.id.SWITCH);

        textView.setText(item.getText());
        sw.setChecked(item.getSelected());
        sw.setOnClickListener(v -> {
            item.setSelected(sw.isChecked());
        });
        return convertView;
    }
}
