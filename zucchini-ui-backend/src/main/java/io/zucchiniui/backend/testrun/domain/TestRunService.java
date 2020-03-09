package io.zucchiniui.backend.testrun.domain;

import java.util.List;

public interface TestRunService {

    void deleteById(String testRunId);

    List<TestRun> findAllByCampaign(String campaign);

    /**
     * Computes and stores in a test run the number of associated scenarios to review.
     *
     * @param testRunId the id of the test run for which you want to compute and to store in it the number of associated scenarios to review.
     */
    void computeAndStoreNumberOfScenariosToReview(String testRunId);
}
