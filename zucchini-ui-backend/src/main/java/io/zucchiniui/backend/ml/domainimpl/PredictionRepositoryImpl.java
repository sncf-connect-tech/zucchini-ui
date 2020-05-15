package io.zucchiniui.backend.ml.domainimpl;

import io.zucchiniui.backend.ml.dao.PredictionDAO;
import io.zucchiniui.backend.ml.domain.PredictionInformation;
import io.zucchiniui.backend.ml.domain.PredictionQuery;
import io.zucchiniui.backend.ml.domain.PredictionRepository;
import io.zucchiniui.backend.support.ddd.morphia.MorphiaQueriableRepository;
import org.springframework.stereotype.Component;

@Component
public class PredictionRepositoryImpl extends MorphiaQueriableRepository<PredictionInformation, String, PredictionQuery> implements PredictionRepository {

    public PredictionRepositoryImpl(
        PredictionDAO dao
    ) {
        super(dao);
    }
}
