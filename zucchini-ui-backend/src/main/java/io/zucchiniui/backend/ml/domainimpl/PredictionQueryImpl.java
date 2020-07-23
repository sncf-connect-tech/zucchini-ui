package io.zucchiniui.backend.ml.domainimpl;

import io.zucchiniui.backend.ml.domain.PredictionInformation;
import io.zucchiniui.backend.ml.domain.PredictionQuery;
import io.zucchiniui.backend.support.ddd.morphia.BaseMorphiaQuery;
import xyz.morphia.query.Query;

public class PredictionQueryImpl extends BaseMorphiaQuery<PredictionInformation> implements PredictionQuery {

    public PredictionQueryImpl(final Query<PredictionInformation> query) {
        super(query);
    }

    @Override
    public PredictionQuery withScenarioId(String scenarioId) {
        configureQuery(q -> q.field("scenarioId").equal(scenarioId));
        return this;
    }

    @Override
    public PredictionQuery withTestRunId(String testRunId) {
        configureQuery(q -> q.field("testRunId").equal(testRunId));
        return this;
    }

    @Override
    public PredictionQuery withScenarioKey(String scenarioKey) {
        configureQuery(q -> q.field("scenarioKey").equal(scenarioKey));
        return this;
    }
}
