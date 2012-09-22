/**
 * @author Herbert Samuels
 */

var clickedButtonId='';

flash = '<?php echo $flash; ?>';
$(document).ready(function() {
	var dateWidget=$('#launched').datepicker();
	attachHandlers();
	testUnderscore();
	$('.alert').alert();
	if (flash!='') {
	        if ( flash=='1') {
	                $('#alert-success').show();
	        }
	        if ( flash=='0') {
	                $('#alert-fail').show();
	        }
	}
});

function testUnderscore() {

}

function attachHandlers() {
	$('#move-up').click(function() {
	        orderContent('up');
	});
	$('#media-modal').on('show', function () {
	  //alert('modal showing');
	})
}

function removeScene() {
    $("#selectedScenes option:selected").remove();
        disableReviewBtn();
}

function playScene() {

    //submit text stuff via ajax so we can write the preview folder's xml file for the chosen swf template
    var template=$('input:radio[name=template]:checked').attr('data-id');
    var sceneData = $("#availableScenes option:selected").val().split('-');
    var sceneId=sceneData[0];
    var template=sceneData[1];
    var data = {'action': 'previewScene', 'id' : sceneId, 'lookup' : 1};
    var previewUrl='getSomeRest.php';
        ajaxBusy();
        ajaxPost(previewUrl,data,
        function () {
                                showScene();
                }
                );
}







// parse json populate table rows, enable edit and create

