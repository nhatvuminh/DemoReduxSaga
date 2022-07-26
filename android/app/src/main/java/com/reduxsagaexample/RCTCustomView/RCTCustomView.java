package com.reduxsagaexample.RCTCustomView;

import android.content.Context;
import android.net.Uri;
import android.util.AttributeSet;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.facebook.drawee.view.SimpleDraweeView;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.build.ReactBuildConfig;
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
