package io.zucchiniui.backend.testrun.domain;

public interface TestRunService {

    void deleteById(String testRunId);

    /**
     * Computes and stores in a test run the number of associated scenarios to review.
     *
     * @param testRunId the id of the test run for which you want to compute and to store in it the number of associated scenarios to review.
     */
    void computeAndStoreNumberOfScenariosToReview(String testRunId);
}
