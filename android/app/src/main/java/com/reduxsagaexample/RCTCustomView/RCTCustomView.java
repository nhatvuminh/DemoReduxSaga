package com.reduxsagaexample.RCTCustomView;

import android.content.Context;
import android.net.Uri;
import android.util.AttributeSet;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.facebook.drawee.view.SimpleDraweeView;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.build.ReactBuildConfig;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.reduxsagaexample.R;

import javax.annotation.Nullable;

public class RCTCustomView extends LinearLayout {
    public RCTCustomView(Context context) {
        super(context);
    }

    public RCTCustomView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
    }

    public RCTCustomView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public void setSource(@Nullable ReadableMap sources) {
        if (sources != null) {
            Uri imageUri = Uri.parse(sources.getString("uri"));
            SimpleDraweeView ivAuthor = (SimpleDraweeView) findViewById(R.id.ivAuthor);
            ivAuthor.setImageURI(imageUri);
        }
    }

    public void setTitle(String title) {
        TextView tvAuthor = (TextView) findViewById(R.id.tvAuthor);    
        tvAuthor.setText(title);
    }

    public void setOnClickTestButton(Boolean onClickTestButton) {
        if (onClickTestButton) {
            Button btnTest = (Button) findViewById(R.id.btnTest);
            if (btnTest != null) {
                btnTest.setOnClickListener(v -> {
                    onReceiveNativeEvent();
                });
            }
        }
    }

    public void onReceiveNativeEvent() {
        WritableMap event = Arguments.createMap();
        event.putString("message", "MyMessage");
        ReactContext reactContext = (ReactContext) getContext();
        reactContext
                .getJSModule(RCTEventEmitter.class)
                .receiveEvent(getId(), "onClick", event);
    }

    private void warnImageSource(String uri) {
        if (ReactBuildConfig.DEBUG) {
            Toast.makeText(
                    getContext(),
                    "Warning: Image source \"" + uri + "\" doesn't exist",
                    Toast.LENGTH_SHORT)
                    .show();
        }
    }
}
