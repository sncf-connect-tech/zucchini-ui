package io.zucchiniui.backend.analysisResult.dao;

import io.zucchiniui.backend.analysisResult.domain.AnalysisResult;
import io.zucchiniui.backend.analysisResult.domain.AnalysisResultQuery;
import io.zucchiniui.backend.support.ddd.morphia.MorphiaTypedQueryDAO;
import xyz.morphia.Datastore;
import xyz.morphia.query.Query;
import org.springframework.stereotype.Component;

import java.util.function.Consumer;

@Component
public class AnalysisResultDAO extends MorphiaTypedQueryDAO<AnalysisResult, String, AnalysisResultQuery> {

    public AnalysisResultDAO(final Datastore ds) {
        super(ds);
    }

    @Override
    public Query<AnalysisResult> prepareTypedQuery(final Consumer<? super AnalysisResultQuery> preparator) {
        final AnalysisResultImpl typedQuery = new AnalysisResultImpl(createQuery());
        preparator.accept(typedQuery);
        return typedQuery.morphiaQuery();
    }

}
