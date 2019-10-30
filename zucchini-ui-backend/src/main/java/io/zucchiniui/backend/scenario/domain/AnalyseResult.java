package io.zucchiniui.backend.scenario.domain;

import com.google.common.base.Strings;
import io.zucchiniui.backend.shared.domain.BasicInfo;
import io.zucchiniui.backend.support.ddd.BaseEntity;
import xyz.morphia.annotations.Entity;
import xyz.morphia.annotations.Id;


@Entity("analyseResult")
public class AnalyseResult extends BaseEntity<String> {

    @Id
    private String id;

    private String analyseResult;

    /**
     * Private constructor for Morphia.
     */
    private AnalyseResult() {

    }

    public String getId() {
        return id;
    }

    @Override
    protected String getEntityId() {
        return getId();
    }

}
