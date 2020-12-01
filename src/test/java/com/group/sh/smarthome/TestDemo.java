package com.group.sh.smarthome;

import org.junit.jupiter.api.Test;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class TestDemo {

    @Test
    public void getDate() throws ParseException {
        SimpleDateFormat date = new SimpleDateFormat("yyyy-MM-dd");
        String timeamdate = date.format(new Date());
        Date date1 = date.parse(timeamdate);
        System.out.println(new Date());
    }
}
