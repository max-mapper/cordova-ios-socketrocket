package com.phonegap.plugin.cordovaSocket;

import android.os.Bundle;
import android.util.Log;
import org.apache.cordova.api.Plugin;
import org.apache.cordova.api.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import de.tavendo.autobahn.WebSocket;
import de.tavendo.autobahn.WebSocketConnection;
import de.tavendo.autobahn.WebSocketException;
import de.tavendo.autobahn.WebSocketConnectionHandler;

public class CordovaSocket extends Plugin {

  private final WebSocket mConnection = new WebSocketConnection();

  public PluginResult execute(String action, JSONArray args, String callbackId) {
    if (action.equalsIgnoreCase("connect")) {
      try {
        JSONObject params = args.getJSONObject(0);
        String wsurl = params.getString("server");
        connect(wsurl, callbackId);
        return noResult();
      } catch (JSONException e) {
  			 Log.e("CordovaLog", "error: " + e.getMessage(), e); 
  			 PluginResult result = new PluginResult(PluginResult.Status.JSON_EXCEPTION, e.getMessage());
  			 error(result, callbackId);
  			 return null;
  		}
  	} else if (action.equalsIgnoreCase("send")) {
  	  try {
        JSONObject params = args.getJSONObject(0);
        String message = params.getString("message");
        mConnection.sendTextMessage(message);
        return noResult();
      } catch (JSONException e) {
  			 Log.e("CordovaLog", "error: " + e.getMessage(), e); 
  			 PluginResult result = new PluginResult(PluginResult.Status.JSON_EXCEPTION, e.getMessage());
  			 error(result, callbackId);
  			 return null;
  		}
    } else {
      return noResult();
    }
  }
  
  public PluginResult noResult() {
    PluginResult r = new PluginResult(PluginResult.Status.NO_RESULT);
		r.setKeepCallback(true);
		return r;
  }
  
  public PluginResult connect(String wsurl, final String callbackId) {    
    try {
      mConnection.connect(wsurl, new WebSocketConnectionHandler() {
        @Override
        public void onOpen() {
          try {
            JSONObject obj = new JSONObject();
            obj.put("open", "true");
            PluginResult res = new PluginResult(PluginResult.Status.OK, obj);
            res.setKeepCallback(true);
            success(res, callbackId);
          } catch (JSONException e) {
            Log.e("CordovaLog", "error: " + e.getMessage(), e); 
          }
        }
       
        @Override
        public void onTextMessage(String payload) {
          try {
            JSONObject obj = new JSONObject();
            obj.put("message", payload);
            PluginResult res = new PluginResult(PluginResult.Status.OK, obj);
            res.setKeepCallback(true);
            success(res, callbackId);
          } catch (JSONException e) {
            Log.e("CordovaLog", "error: " + e.getMessage(), e); 
          }
        }
       
        @Override
        public void onClose(int code, String reason) {
          try {
            JSONObject obj = new JSONObject();
            obj.put("error", reason);
            PluginResult res = new PluginResult(PluginResult.Status.OK, obj);
            res.setKeepCallback(true);
            success(res, callbackId);
          } catch (JSONException e) {
            Log.e("CordovaLog", "error: " + e.getMessage(), e); 
          }
        }
      });
    } catch (WebSocketException e) {
      try {
        Log.e("CordovaLog", "WEBSOCKETEXCEPTION error: " + e); 
        JSONObject obj = new JSONObject();
        obj.put("error", e);
        PluginResult res = new PluginResult(PluginResult.Status.OK, obj);
        res.setKeepCallback(true);
        success(res, callbackId);
      } catch (JSONException err) {
        Log.e("CordovaLog", "error: " + err.getMessage(), err); 
      }
    }
		return null;
  }
  
  // private void setButtonDisconnect() {
  //    mHostname.setEnabled(false);
  //    mPort.setEnabled(false);
  //    mStart.setText("Disconnect");
  //    mStart.setOnClickListener(new Button.OnClickListener() {
  //       public void onClick(View v) {
  //          mConnection.disconnect();
  //       }
  //    });
  // }
  // 
  // private final WebSocket mConnection = new WebSocketConnection();
  // 
  // private void start() {
  // 
  // 
  //    mStatusline.setText("Status: Connecting to " + wsuri + " ..");
  // 
  //    setButtonDisconnect();
  // 

  // 
  // @Override
  // public void onCreate(Bundle savedInstanceState) {
  // 
  //    super.onCreate(savedInstanceState);
  //    setContentView(R.layout.main);
  // 
  //    mHostname = (EditText) findViewById(R.id.hostname);
  //    mPort = (EditText) findViewById(R.id.port);
  //    mStatusline = (TextView) findViewById(R.id.statusline);
  //    mStart = (Button) findViewById(R.id.start);
  //    mMessage = (EditText) findViewById(R.id.msg);
  //    mSendMessage = (Button) findViewById(R.id.sendMsg);
  // 
  //    mSettings = getSharedPreferences(PREFS_NAME, 0);
  //    loadPrefs();
  // 
  //    setButtonConnect();
  //    mSendMessage.setEnabled(false);
  //    mMessage.setEnabled(false);
  // 
  //    mSendMessage.setOnClickListener(new Button.OnClickListener() {
  //       public void onClick(View v) {
  //          mConnection.sendTextMessage(mMessage.getText().toString());
  //       }
  //    });
  // }
  // 
  // @Override
  // protected void onDestroy() {
  //     super.onDestroy();
  //     if (mConnection.isConnected()) {
  //        mConnection.disconnect();
  //     }
  // }
  // 

}