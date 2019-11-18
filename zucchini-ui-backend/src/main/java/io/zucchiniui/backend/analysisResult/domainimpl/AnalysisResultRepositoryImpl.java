package io.zucchiniui.backend.analysisResult.domainimpl;

import io.zucchiniui.backend.analysisResult.dao.AnalysisResultDAO;
import io.zucchiniui.backend.analysisResult.domain.AnalysisResult;
import io.zucchiniui.backend.analysisResult.domain.AnalysisResultQuery;
import io.zucchiniui.backend.analysisResult.domain.AnalysisResultRepository;
import io.zucchiniui.backend.support.ddd.morphia.MorphiaQueriableRepository;
import org.springframework.stereotype.Component;

@Component
class AnalysisResultRepositoryImpl extends MorphiaQueriableRepository<AnalysisResult, String, AnalysisResultQuery> implements AnalysisResultRepository {

    public AnalysisResultRepositoryImpl(final AnalysisResultDAO dao) {
        super(dao);
    }

}
