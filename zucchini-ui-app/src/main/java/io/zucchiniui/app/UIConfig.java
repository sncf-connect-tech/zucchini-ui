package io.zucchiniui.app;

import io.zucchiniui.backend.config.CorrectionActionConfig;
import io.zucchiniui.backend.config.EncounteredProblem;

import java.util.List;

public class UIConfig {

    private List<EncounteredProblem> encounteredProblems;

    private List<CorrectionActionConfig>  correctionActionConfig;

    private boolean useFeaturePresence;

    public List<EncounteredProblem> getEncounteredProblems() {
        return encounteredProblems;
    }

    public void setEncounteredProblems(List<EncounteredProblem> encounteredProblems) {
        this.encounteredProblems = encounteredProblems;
    }

    public List<CorrectionActionConfig> getCorrectionActionConfig() {
        return correctionActionConfig;
    }

    public void setCorrectionActionConfig(List<CorrectionActionConfig> correctionActionConfig) {
        this.correctionActionConfig = correctionActionConfig;
    }

    public boolean getUseFeaturePresence() {
        return useFeaturePresence;
    }

    public void setUseFeaturePresence(boolean useFeaturePresence) {
        this.useFeaturePresence = useFeaturePresence;
    }
}
