package com.example.cours03;

public class TodoItem {
    private String text;
    private Boolean selected = false;

    public TodoItem(String a, Boolean b) {
        text = a;
        selected = b;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Boolean getSelected() {
        return selected;
    }

    public void setSelected(Boolean selected) {
        this.selected = selected;
    }
}
