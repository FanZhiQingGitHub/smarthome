package com.group.sh.smarthome.resultbean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommonResult<T> {

    private Integer code;
    private String message;
    private T      entitydata;
    private List<?> data;

    public CommonResult(Integer code, String message) {
        this(code,message,null,null);
    }
}
