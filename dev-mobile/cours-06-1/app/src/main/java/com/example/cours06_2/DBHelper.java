package com.example.cours06_2;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

import androidx.annotation.Nullable;

public class DBHelper extends SQLiteOpenHelper {
    public static final int DATABASE_VERSION=1;
    public static final String DATABASE_NAME="EXAMPLE1";

    private static final String CREATE_TABLE_TEXT="create table "+
            "TABLE_TEXT (col_text text);";
    public DBHelper(@Nullable Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL(CREATE_TABLE_TEXT);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

    }
    public void insertData(String s)
    {
        Log.i("APP"," Insert in database");
        SQLiteDatabase db = getWritableDatabase();
        db.beginTransaction();
        ContentValues values = new ContentValues();
        values.put("col_text", s);
        db.insertOrThrow("TABLE_TEXT",null, values);
        db.setTransactionSuccessful();
        db.endTransaction();
    }
    public String readData()
    {
        Log.i("APP", "Reading database...");
        String select = new String("SELECT * from " + "TABLE_TEXT");
        SQLiteDatabase db = getReadableDatabase();
        Cursor cursor = db.rawQuery(select, null);
        Log.i("APP", "Number of entries: " + cursor.getCount());
        if (cursor.getCount() > 0) {
            cursor.moveToLast();
            int t = cursor.getColumnIndex("col_text");
            return cursor.getString(t >= 0 ? t : 0);

        }
        return "";
    }
}