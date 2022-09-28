package com.reduxsagaexample.RCTCustomView;

import android.content.Context;
import android.net.Uri;
import android.util.Log;
import android.view.LayoutInflater;
import android.widget.ImageView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.react.bridge.Dynamic;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewProps;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.image.ImageResizeMode;
import com.facebook.react.views.imagehelper.ResourceDrawableIdHelper;
import com.reduxsagaexample.R;

import java.util.Map;

@ReactModule(name = ReactCustomViewManager.REACT_CLASS)
public class ReactCustomViewManager extends SimpleViewManager<RCTCustomView> {

    public static final String REACT_CLASS = "RCTCustomView";
    ReactApplicationContext mCallerContext;

    public ReactCustomViewManager(ReactApplicationContext reactContext) {
        mCallerContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @NonNull
    @Override
    protected RCTCustomView createViewInstance(@NonNull ThemedReactContext context) {
        LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        return (RCTCustomView) inflater.inflate(R.layout.custom_layout, null);
    }

    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.<String, Object>builder()
                .put("onClick",
                        MapBuilder.of("registrationName",
                                // To map the onClick event name to the onClickTestButton callback prop in JavaScript
                                "onClickTestButton"))
                .build();
    }

    @ReactProp(name = "source")
    public void setSource(RCTCustomView view, @Nullable ReadableMap src) {
        view.setSource(src);
    }

    @ReactProp(name = "title")
    public void setTitle(RCTCustomView view, String title) {
        view.setTitle(title);
    }

    @ReactProp(name = "onClickTestButton")
    public void setOnClickTestButton(RCTCustomView view, Boolean onClickTestButton) {
        view.setOnClickTestButton(onClickTestButton);
    }

    // @ReactProp(name = ViewProps.RESIZE_MODE)
    // public void setResizeMode(RCTCustomView view, @Nullable String resizeMode) {
    // view.setScaleType(ImageResizeMode.toScaleType(resizeMode));
    // }
}