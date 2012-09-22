
/* jsonProcess.js by @brianyang
*/

(function() {
  var submitForm;

  submitForm = function() {
    var formData, formObj, request;
    formData = $('#project-form').serializeArray();
    formObj = {
      'form': formData,
      'media': glob.json,
      'awards': glob.json2,
      'links': glob.json3
    };
    request = $.ajax({
      url: 'http://url',
      data: formObj,
      dataType: 'json'
    });
    request.done(function() {
      return window.location('/success/');
    });
    return request.fail(function() {
      return alert('failed to submit form');
    });
  };

  $('form').submit(function(e) {
    e.preventDefault();
    return submitForm();
    /* show proper modal and set data mode
    */
  });

  $(function() {
    var showModal;
    showModal = function() {
      var types;
      types = ['media', 'awards', 'links'];
      $('.table-striped').eq(0).on('click', '.icon-pencil', function() {
        $('#' + types[0] + '-modal').modal('show');
        return $('#' + types[0] + '-modal').attr('data-mode', 'edit');
      });
      $('.table-striped').eq(1).on('click', '.icon-pencil', function() {
        $('#' + types[1] + '-modal').modal('show');
        return $('#' + types[1] + '-modal').attr('data-mode', 'edit');
      });
      return $('.table-striped').eq(2).on('click', '.icon-pencil', function() {
        $('#' + types[2] + '-modal').modal('show');
        return $('#' + types[2] + '-modal').attr('data-mode', 'edit');
      });
    };
    return showModal();
  });

  window.glob = {};

  /* parse (table index, json data) ->
  */

  glob.parse = function(table, json) {
    var createRows, i, reduceLen, reduceLen2, reduceLen3, reduceLength, reduceLength2, reduceLength3, td, tr, trFirst, _results;
    td = $($('.table-striped')[table]).find('tr').eq(1).children('td');
    trFirst = $($('.table-striped')[table]).find('tbody').eq(0).find('tr')[0];
    tr = $($('.table-striped')[table]).find('tbody').eq(0).find('tr');
    /* create rows for json items
    */
    if (glob.json.length > 0) reduceLength = glob.json.length - 1;
    if (glob.json2.length > 0) reduceLength2 = glob.json2.length - 1;
    if (glob.json3.length > 0) reduceLength3 = glob.json3.length - 1;
    if (glob.json.length > 1) reduceLen = glob.json.length - 2;
    if (glob.json2.length > 1) reduceLen2 = glob.json2.length - 2;
    if (glob.json3.length > 1) reduceLen3 = glob.json3.length - 2;
    if (table === 0) {
      for (i = 0; 0 <= reduceLen ? i <= reduceLen : i >= reduceLen; 0 <= reduceLen ? i++ : i--) {
        createRows = $(trFirst).clone().insertAfter(trFirst);
      }
    }
    if (table === 1) {
      for (i = 0; 0 <= reduceLen2 ? i <= reduceLen2 : i >= reduceLen2; 0 <= reduceLen2 ? i++ : i--) {
        createRows = $(trFirst).clone().insertAfter(trFirst);
      }
    }
    if (table === 2) {
      for (i = 0; 0 <= reduceLen3 ? i <= reduceLen3 : i >= reduceLen3; 0 <= reduceLen3 ? i++ : i--) {
        createRows = $(trFirst).clone().insertAfter(trFirst);
      }
    }
    if (table === 0) {
      for (i = 0; 0 <= reduceLength ? i <= reduceLength : i >= reduceLength; 0 <= reduceLength ? i++ : i--) {
        $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(0).append(json[i][4].value) && $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(1).append(json[i][3].value) && $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(2).append(json[i][2].value) && $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(3).append(json[i][7].value) && $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(4).append(json[i][5].value) && $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(5).append(json[i][6].value) && $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(6).append(json[i][8].value);
      }
    }
    if (table === 1) {
      for (i = 0; 0 <= reduceLength2 ? i <= reduceLength2 : i >= reduceLength2; 0 <= reduceLength2 ? i++ : i--) {
        $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(0).append(json[i][2].value) && $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(1).append(json[i][3].value) && $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(2).append(json[i][4].value) && $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(3).append(json[i][5].value);
      }
    }
    if (table === 2) {
      _results = [];
      for (i = 0; 0 <= reduceLength3 ? i <= reduceLength3 : i >= reduceLength3; 0 <= reduceLength3 ? i++ : i--) {
        _results.push($($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(0).append(json[i][0].value) && $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(1).append(json[i][1].value));
      }
      return _results;
    }
  };

  /* populate fields with data for edit
  */

  $(function() {
    return $('.table-striped').on('click', '.icon-pencil', function() {
      var awards, i, links, media, type;
      type = $(this).parents('.table-striped').data('type');
      i = $(this).parents('tr').index();
      media = function() {
        var json;
        json = glob.json;
        $('#media-modal').attr('data-item', i);
        $('#title').val(json[i][2].value);
        $('#height').val(json[i][5].value);
        return $('#width').val(json[i][6].value);
      };
      if (type === 'media') media();
      awards = function() {
        var json;
        json = glob.json2;
        $('#awards-modal').attr('data-item', i);
        $("#name").val(json[i][2].value);
        return $("#badge").val(json[i][5].value);
      };
      if (type === 'awards') awards();
      links = function() {
        var json;
        json = glob.json3;
        $('#links-modal').attr('data-item', i);
        $('#links').val(json[i][0].value);
        return $('#url2').val(json[i][1].value);
      };
      if (type === 'links') return links();
    });
  });

  $(function() {
    /* add remove
    */    return $('.table-striped').on('click', '.icon-remove', function() {
      var i, json, type;
      i = $(this).parents('tr').index();
      type = $(this).parents('.table-striped').attr('data-type');
      $('#media-modal,#awards-modal,#links-modal').attr('data-mode', '');
      if (type === 'media') json = glob.json;
      if (type === 'awards') json = glob.json2;
      if (type === 'links') json = glob.json3;
      json.splice(i, 1);
      if (type === 'media') glob.showUpdated('media');
      if (type === 'awards') glob.showUpdated('awards');
      if (type === 'links') return glob.showUpdated('links');
    });
  });

  /* clear fields when creating new item
  */

  $(function() {
    return $('.icon-plus-sign').click(function() {
      $(this).parent().parent().parent().removeAttr('data-item');
      $('#media-modal,#links-modal,#awards-modal').attr('data-mode', 'add');
      $('.modal-body input,.modal-body textarea').val('');
      $('#r1').val('yes');
      return $('#r2').val('no');
    });
  });

  /* update json data on edit done
  */

  $(function() {
    return $('#media-modal,#awards-modal,#links-modal').on('click', '.btn.secondary', function() {
      var formId, formNum, i, json, regex, updateData, updateData2, updateData3;
      regex = /[0-9]/;
      formId = $(this).parents('form').attr('id');
      formNum = parseInt(formId.match(regex));
      if (formNum === 0) i = $('#media-modal').attr('data-item');
      if (formNum === 1) i = $('#awards-modal').attr('data-item');
      if (formNum === 2) i = $('#links-modal').attr('data-item');
      if (formNum === 0) json = glob.json;
      if (formNum === 1) json = glob.json2;
      if (formNum === 2) json = glob.json3;
      updateData = function() {
        json[i][2].value = $('#title').val();
        json[i][5].value = $('#height').val();
        json[i][6].value = $('#width').val();
        return json[i][7].value = $('#link').val();
      };
      if ($('#media-modal').attr('data-mode') === 'edit' && formNum === 0) {
        updateData();
      }
      updateData2 = function() {
        json[i][2].value = $('#name').val();
        return json[i][5].value = $('#badge').val();
      };
      if ($('#awards-modal').attr('data-mode') === 'edit' && formNum === 1) {
        updateData2();
      }
      updateData3 = function() {
        json[i][0].value = $('#links').val();
        return json[i][1].value = $('#url2').val();
      };
      if ($('#links-modal').attr('data-mode') === 'edit' && formNum === 2) {
        updateData3();
      }
      if (formNum === 0) glob.showUpdated('media');
      if (formNum === 1) glob.showUpdated('awards');
      if (formNum === 2) return glob.showUpdated('links');
    });
  });

  /* update table data
  */

  glob.json = [];

  glob.json2 = [];

  glob.json3 = [];

  glob.showUpdated = function(table) {
    var awards, links, media, refill, thisJson, thisJson2, thisJson3;
    refill = function(num, tds) {
      var icons, td, _i, _len, _results;
      icons = $('.table-striped').eq(num).find('tbody>tr>td').last().contents();
      $('.table-striped').eq(num).find('tbody').empty().append('<tr>');
      _results = [];
      for (_i = 0, _len = tds.length; _i < _len; _i++) {
        td = tds[_i];
        $('.table-striped').eq(num).find('tbody>tr').append('<td>');
        _results.push($('.table-striped').eq(num).find('tbody>tr').each(function() {
          return $(this).find('td').last().append(icons);
        }));
      }
      return _results;
    };
    media = function() {
      var num, tds;
      num = 0;
      tds = [1, 2, 3, 4, 5, 6, 7, 8];
      return refill(num, tds);
    };
    if (table === 'media') media();
    awards = function() {
      var num, tds;
      num = 1;
      tds = [1, 2, 3, 4, 5];
      return refill(num, tds);
    };
    if (table === 'awards') awards();
    links = function() {
      var num, tds;
      num = 2;
      tds = [1, 2, 3];
      return refill(num, tds);
    };
    if (table === 'links') links();
    thisJson = $($('form')[1]).serializeArray();
    thisJson2 = $($('form')[2]).serializeArray();
    thisJson3 = $($('form')[3]).serializeArray();
    if ($('#media-modal').attr('data-mode') === 'add' && table === 'media') {
      glob.json.push(thisJson);
    }
    if ($('#awards-modal').attr('data-mode') === 'add' && table === 'awards') {
      glob.json2.push(thisJson2);
    }
    if ($('#links-modal').attr('data-mode') === 'add' && table === 'links') {
      glob.json3.push(thisJson3);
    }
    if (table === 'media') glob.parse(0, glob.json);
    if (table === 'awards') glob.parse(1, glob.json2);
    if (table === 'links') return glob.parse(2, glob.json3);
  };

}).call(this);
