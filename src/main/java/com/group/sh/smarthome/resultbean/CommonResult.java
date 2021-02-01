package com.group.sh.smarthome.resultbean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommonResult<T> {

    private Integer code;
    private String message;
    private Integer count;
    private T      entityData;
    private List<?> data;
    private Map<?,?> mapData;
    private String sysCode;//0---正常，1---异常

    public CommonResult(Integer code, String message,Integer count) {
        this(code,message,count,null,null,null,null);
    }
}
