package io.zucchiniui.backend.comment.rest;


import javax.validation.constraints.NotEmpty;

public class CreateCommentRequest {

    @NotEmpty
    private String content;

    private String analyseAction;

    public String getContent() {
        return content;
    }

    public void setContent(final String content) {
        this.content = content;
    }

    public String getAnalyseAction() {
        return analyseAction;
    }

    public void setAnalyseAction(String analyseAction) {
        this.analyseAction = analyseAction;
    }
}
