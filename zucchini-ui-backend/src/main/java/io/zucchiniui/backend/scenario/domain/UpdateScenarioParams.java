package io.zucchiniui.backend.scenario.domain;

import java.util.Optional;

public class UpdateScenarioParams {

    private final Optional<ScenarioStatus> status;

    private final Optional<Boolean> reviewed;

    private final Optional<String> analyseResult;

    private final Optional<String> analyse;

    public UpdateScenarioParams(
        final Optional<ScenarioStatus> status,
        final Optional<Boolean> reviewed,
        final Optional<String> analyseResult,
        Optional<String> analyse) {
        this.status = status;
        this.reviewed = reviewed;
        this.analyseResult = analyseResult;
        this.analyse = analyse;
    }

    public Optional<ScenarioStatus> getStatus() {
        return status;
    }

    public Optional<Boolean> isReviewed() {
        return reviewed;
    }

    public Optional<String> getAnalyseResult() {
        return analyseResult;
    }

    public Optional<String> getAnalyse() {
        return analyse;
    }

}
