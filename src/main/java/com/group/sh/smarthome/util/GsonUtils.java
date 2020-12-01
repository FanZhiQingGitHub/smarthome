package com.group.sh.smarthome.util;
import com.google.gson.Gson;

/**
 * 懒汉是Gson单例工具类
 */
public class GsonUtils {
    public static GsonUtils gsonUtil;
    private Gson g;

    private GsonUtils() {
        g = new Gson();
    }

    public synchronized static GsonUtils getgsonUtils() {
        if (gsonUtil == null) {
            gsonUtil = new GsonUtils();
        }
        return gsonUtil;
    }

    public Gson getGson() {
        return g;
    }

    public String toStr(Object ob) {
        return g.toJson(ob);
    }
}
