package com.group.sh.smarthome.util;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class FileUtils {

    public static void getFileName() {
        String path = "D:\\JAVA\\smarthome\\src\\main\\resources\\templates\\userhtml"; // 路径
        File file = new File(path);
        if (!file.exists()) {
            System.out.println(path + " not exists");
            return;
        }
        File fileArr[] = file.listFiles();
        for (int i = 0; i < fileArr.length; i++) {
            File fs = fileArr[i];
            //System.out.println(fs.getName());
        }
    }
}
