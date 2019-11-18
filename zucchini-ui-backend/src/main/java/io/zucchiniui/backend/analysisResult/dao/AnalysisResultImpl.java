package io.zucchiniui.backend.analysisResult.dao;

import io.zucchiniui.backend.analysisResult.domain.AnalysisResult;
import io.zucchiniui.backend.analysisResult.domain.AnalysisResultQuery;
import io.zucchiniui.backend.support.ddd.morphia.BaseMorphiaQuery;
import xyz.morphia.query.Query;

class AnalysisResultImpl extends BaseMorphiaQuery<AnalysisResult> implements AnalysisResultQuery {

    protected AnalysisResultImpl(final Query<AnalysisResult> query) {
        super(query);
    }

    @Override
    public AnalysisResultQuery orderByShortLabel() {
        configureQuery(q -> q.order("shortLabel"));
        return this;
    }
}
