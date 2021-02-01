package com.group.sh.smarthome.resultbean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageListEntity {

    /*
     *自定义6个分页条件
     */
    private String objectOne;
    private String objectTwo;
    private String objectThree;
    private String objectFour;
    private String objectFive;
    private String objectSix;

    private String findDate;
    private String startTime;
    private String endTime;

    private Integer page;//从第几条开始
    private Integer limit;//显示几条数据

}
