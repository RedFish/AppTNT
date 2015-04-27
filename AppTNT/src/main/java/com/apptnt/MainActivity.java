package com.apptnt;

import org.apache.cordova.*;
import android.os.Bundle;

/**
 * Main Activity initializing PhoneGap (Cordova)
 * @author Richard GUERCI & Julien SIERRA
 *
 */

public class MainActivity extends DroidGap {

    @Override
	public void onCreate(Bundle savedInstanceState) {
    	super.onCreate(savedInstanceState);
		super.loadUrl("file:///android_asset/www/index.html");
    }

}
