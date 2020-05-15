package io.zucchiniui.backend.ml.domain;

import io.zucchiniui.backend.support.ddd.QueriableRepository;

public interface PredictionRepository extends QueriableRepository<PredictionInformation, String, PredictionQuery> {

}
