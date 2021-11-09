package com.example.cours06;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.telephony.SmsManager;
import android.util.Log;
import android.widget.Button;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    Button sendButton;
    TextView phoneNumberInput;
    TextView messageInput;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        sendButton = findViewById(R.id.SEND_SMS_BUTTON);
        phoneNumberInput = findViewById(R.id.PHONE_NUMBER_INPUT);
        messageInput = findViewById(R.id.SMS_MESSAGE_TEXTBOX);
        sendButton.setOnClickListener(v -> {
            ActivityCompat.requestPermissions(this,  new String[]{Manifest.permission.SEND_SMS}, 0);
        });
    }

    @Override
    public void onRequestPermissionsResult(int requestCode,
                                           @NonNull String[] permissions, @NonNull int[] grantResults) {
        // Only one permission is asked here
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (grantResults.length > 0
                && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
            Log.i("APP", "Permission granted :)");
//            this.sendSms(phoneNumberInput.getText().toString(), messageInput.getText().toString());
        }
    }

    private void sendSms(String phone, String message) {
        SmsManager smsManager = SmsManager.getDefault();
        smsManager.sendTextMessage(phone, null, message, null, null);
    }
}