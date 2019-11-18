package io.zucchiniui.backend.analysisResult.views;

import io.zucchiniui.backend.analysisResult.domain.AnalysisResult;
import io.zucchiniui.backend.shared.views.AbstractConfigurableMapper;
import ma.glasnost.orika.MapperFactory;

public class AnalysisResultViewMapper extends AbstractConfigurableMapper {
    @Override
    protected void doConfigure(final MapperFactory factory) {factory.classMap(AnalysisResult.class, AnalysisResultListItemView.class)
            .byDefault()
            .register();
    }
}
