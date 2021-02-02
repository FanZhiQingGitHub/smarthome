package com.group.sh.smarthome.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 *
 * </p>
 *
 * @author fzq
 * @since 2020-11-26
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class TblAccountType extends GenericClass {

    /**
     * 账户类型id
     */
    @TableId(value = "ACCOUNT_TYPE_ID", type = IdType.AUTO)
    private Integer accountTypeId;

    /**
     * 账户类型名称
     */
    @TableField("ACCOUNT_TYPE_NM")
    private String accountTypeNm;

}
