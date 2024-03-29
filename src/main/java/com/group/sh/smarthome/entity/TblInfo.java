package com.group.sh.smarthome.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 *      资讯表信息类
 * </p>
 *
 * @author fzq
 * @since 2020-11-26
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class TblInfo extends GenericClass {

    /**
     * 资讯id
     */
    @TableId(value = "INFO_ID", type = IdType.AUTO)
    private Integer infoId;

    /**
     * 资讯标题
     */
    @TableField("INFO_TITLE")
    private String infoTitle;

    /**
     * 资讯内容
     */
    @TableField("INFO_DETAIL")
    private String infoDetail;

}
