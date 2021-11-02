package com.example.cours05_2;

import androidx.appcompat.app.AppCompatActivity;

import android.net.Uri;
import android.os.Bundle;
import android.util.JsonReader;
import android.util.Log;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.squareup.picasso.Picasso;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.Reader;

public class MainActivity extends AppCompatActivity {

    TextView cityInput;
    TextView temperatureValue;
    TextView conditionValue;
    ImageView iconContainer;
    Button searchButton;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        iconContainer = findViewById(R.id.WEATHER_ICON);
        conditionValue = findViewById(R.id.CONDITION_VALUE);
        temperatureValue = findViewById(R.id.TEMPERATURE_VALUE);
        cityInput = findViewById(R.id.CITY_INPUT);
        searchButton = findViewById(R.id.SEARCH_BUTTON);
        searchButton.setOnClickListener(v -> {
            fetchCity(cityInput.getText().toString());
        });
    }

    private void fetchCity(String cityName) {
        RequestQueue queue = Volley.newRequestQueue(this);
        String url = "https://www.prevision-meteo.ch/services/json/" + cityName;
        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {
                            JSONObject data = new JSONObject(response);
                            JSONObject cityInfo = data.getJSONObject("city_info");
                            JSONObject conditions = data.getJSONObject("current_condition");
                            String condition = conditions.getString("condition");
                            Integer temperature = conditions.getInt("tmp");
                            String icon = conditions.getString("icon_big");

                            Picasso.get().load(icon).into(iconContainer);

                            conditionValue.setText(
                                    condition
                                            + " - "
                                            + cityInfo.getString("name")
                                            + ", "
                                            + cityInfo.getString("country")
                            );
                            temperatureValue.setText(temperature.toString());
                        } catch (JSONException e) {
                            Log.v("BRUH", e.getMessage());
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                    }
                });

// Add the request to the RequestQueue.
        queue.add(stringRequest);
    }
}