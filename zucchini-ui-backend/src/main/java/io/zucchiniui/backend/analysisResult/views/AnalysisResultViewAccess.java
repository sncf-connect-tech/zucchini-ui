package io.zucchiniui.backend.analysisResult.views;

import io.zucchiniui.backend.config.EncounteredProblem;
import ma.glasnost.orika.BoundMapperFacade;
import org.springframework.stereotype.Component;
import xyz.morphia.query.Query;
import io.zucchiniui.backend.support.ddd.morphia.MorphiaUtils;

import java.util.List;

import io.zucchiniui.backend.analysisResult.domain.AnalysisResult;
import io.zucchiniui.backend.analysisResult.domain.AnalysisResultQuery;
import io.zucchiniui.backend.analysisResult.dao.AnalysisResultDAO;

import java.util.function.Consumer;
import java.util.stream.Collectors;

@Component
public class AnalysisResultViewAccess {

    private final AnalysisResultDAO analysisResultDAO;

    private final BoundMapperFacade<AnalysisResult, EncounteredProblem> analysisresultToListItemViewMapper;

    public AnalysisResultViewAccess(final AnalysisResultDAO analysisResultDAO) {
        this.analysisResultDAO = analysisResultDAO;

        final AnalysisResultViewMapper mapper = new AnalysisResultViewMapper();
        analysisresultToListItemViewMapper =  mapper.dedicatedMapperFor(AnalysisResult.class,
            EncounteredProblem.class,
            false);
    }

    public List<EncounteredProblem> getAnalysisResultListItems(final Consumer<AnalysisResultQuery> preparator) {
        final Query<AnalysisResult> query = analysisResultDAO.prepareTypedQuery(preparator)
            .project("shortLabel", true)
            .project("longLabel", true);

        return MorphiaUtils.streamQuery(query)
            .map(analysisresultToListItemViewMapper::map)
            .collect(Collectors.toList());
    }

}
