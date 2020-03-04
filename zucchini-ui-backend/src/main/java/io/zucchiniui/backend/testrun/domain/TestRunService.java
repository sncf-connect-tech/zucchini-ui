package io.zucchiniui.backend.testrun.domain;

import java.util.List;

public interface TestRunService {

    void deleteById(String testRunId);

    List<TestRun> findAllByCampaign(String campaign);

}
