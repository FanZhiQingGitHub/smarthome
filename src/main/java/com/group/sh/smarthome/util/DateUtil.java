package com.group.sh.smarthome.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * 时间日期工具类
 */
public class DateUtil {

    /**
     * 根据日期确定对应星期是多少
     * @param dt
     * @return
     */
    public static String getWeekOfDate(Date dt) {
        String[] weekDays = {"星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"};
        Calendar cal = Calendar.getInstance();
        cal.setTime(dt);
        int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
        if (w < 0)
            w = 0;
        return weekDays[w];
    }

    /**
     * 得到本周周一日期
     *
     * @return yyyy-MM-dd
     */
    public static String getMondayOfThisWeek(int startdays) {
        SimpleDateFormat format = new SimpleDateFormat("YYYY-MM-dd");
        Calendar c = Calendar.getInstance();
        int day_of_week = c.get(Calendar.DAY_OF_WEEK) - 1;
        if (day_of_week == 0)
            day_of_week = 7;
        c.add(Calendar.DATE, -day_of_week + startdays);//获取本周一，下周一就是+7，上周一就是-7
        return format.format(c.getTime());
    }

    /**
     * 得到本周周日日期
     *
     * @return yyyy-MM-dd
     */
    public static String getSundayOfThisWeek(int lastdays) {
        int days = 7;
        SimpleDateFormat format = new SimpleDateFormat("YYYY-MM-dd");
        Calendar c = Calendar.getInstance();
        int day_of_week = c.get(Calendar.DAY_OF_WEEK) - 1;
        if (day_of_week == 0)
            day_of_week = 7;
        c.add(Calendar.DATE, -day_of_week + lastdays);//获取本周日，下周日就是+7，上周日就是-7
        return format.format(c.getTime());
    }

    /**
     * 根据请假的日期找出该日期所在的周的周一和周日的日期
     * @param date
     * @return
     * @throws ParseException
     */
    public static String getMondaySundayByDate(String date) throws ParseException {
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd"); //设置时间格式
        Calendar cal = Calendar.getInstance();
        Date time=sdf.parse(date);
        cal.setTime(time);
//        System.out.println("要计算日期为:"+sdf.format(cal.getTime())); //输出要计算日期

        //判断要计算的日期是否是周日，如果是则减一天计算周六的，否则会出问题，计算到下一周去了
        int dayWeek = cal.get(Calendar.DAY_OF_WEEK);//获得当前日期是一个星期的第几天
        if(1 == dayWeek) {
            cal.add(Calendar.DAY_OF_MONTH, -1);
        }

        cal.setFirstDayOfWeek(Calendar.MONDAY);//设置一个星期的第一天，按中国的习惯一个星期的第一天是星期一

        int day = cal.get(Calendar.DAY_OF_WEEK);//获得当前日期是一个星期的第几天
        cal.add(Calendar.DATE, cal.getFirstDayOfWeek()-day);//根据日历的规则，给当前日期减去星期几与一个星期第一天的差值
//        System.out.println("所在周星期一的日期："+sdf.format(cal.getTime()));
        String monday = sdf.format(cal.getTime());
//        System.out.println(cal.getFirstDayOfWeek()+"-"+day+"+6="+(cal.getFirstDayOfWeek()-day+6));

        cal.add(Calendar.DATE, 6);
//        System.out.println("所在周星期日的日期："+sdf.format(cal.getTime()));
        String sunday = sdf.format(cal.getTime());

        return monday+"&"+sunday;
    }

    /**
     * 获取传入日期所在年的第一天
     * @param date
     * @return
     */
    public static Date getFirstDayDateOfYear(final Date date) {
        final Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        final int last = cal.getActualMinimum(Calendar.DAY_OF_YEAR);
        cal.set(Calendar.DAY_OF_YEAR, last);
        return cal.getTime();
    }

    //今天是当月的第几天
    public static int getWeeksByMonth(){
        Calendar calendar = Calendar.getInstance();
        return calendar.get(Calendar.DAY_OF_MONTH);
    }

    //今天是今年的第几天
    public static int getWeeksByYear(){
        Calendar calendar = Calendar.getInstance();
        return calendar.get(Calendar.DAY_OF_YEAR);
    }



}
