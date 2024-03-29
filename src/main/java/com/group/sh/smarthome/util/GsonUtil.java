package com.group.sh.smarthome.util;
import com.google.gson.Gson;

/**
 * 懒汉是Gson单例工具类
 */
public class GsonUtil {
    public static GsonUtil gsonUtil;
    private Gson g;

    private GsonUtil() {
        g = new Gson();
    }

    public synchronized static GsonUtil getgsonUtils() {
        if (gsonUtil == null) {
            gsonUtil = new GsonUtil();
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
