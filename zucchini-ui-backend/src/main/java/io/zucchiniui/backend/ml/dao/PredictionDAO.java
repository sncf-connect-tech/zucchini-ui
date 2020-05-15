package io.zucchiniui.backend.ml.dao;

import io.zucchiniui.backend.ml.domain.PredictionInformation;
import io.zucchiniui.backend.ml.domain.PredictionQuery;
import io.zucchiniui.backend.ml.domainimpl.PredictionQueryImpl;
import io.zucchiniui.backend.support.ddd.morphia.MorphiaTypedQueryDAO;
import org.springframework.stereotype.Component;
import xyz.morphia.Datastore;
import xyz.morphia.query.Query;

import java.util.function.Consumer;

@Component
public class PredictionDAO extends MorphiaTypedQueryDAO<PredictionInformation, String, PredictionQuery> {

    public PredictionDAO(Datastore ds) {
        super(ds);
    }

    @Override
    public Query<PredictionInformation> prepareTypedQuery(final Consumer<? super PredictionQuery> preparator) {
        final PredictionQueryImpl typedQuery = new PredictionQueryImpl(createQuery());
        preparator.accept(typedQuery);
        return typedQuery.morphiaQuery();
    }

}
