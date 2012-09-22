### jsonProcess.js by @brianyang ###

projId =

window.glob = window.glob || []
window.glob.addTags = ->
  #console.log 'addTags()'# {{{
  id = window.location.pathname.split('/')[2]
  tags = $('#Project_tags').val().split(',')
  url = '/v1/tags/' + id
  $.ajax
    url:url
    type:'delete'
    success: (d) ->
      console.log d
  $(tags).each ->
    url = '/v1/tags/' + id + '/project?tag=' + this
    #console.log url
    $.ajax
      url:url
      type:'post'
      success: (d) ->
        console.log d# }}}

window.populateData = ->
  bodyId = $('body').attr('id')# {{{
  fetchProjectData = ->
    #console.log 'fetching'
    url  = '/v1/projects'
    $.ajax
      url: url
      success: (d) ->
        $(d).each ->
          #console.log this.projectTitle
          #console.log this._id
          $('#all-projects').append('<li><a href=/editProject/' + this._id + ' >' + this.projectTitle + '</a><a class=del href=# ><i class="icon-remove"></i></a></li>')
  fetchProjectData() if bodyId == 'list-project-wrap'
  console.log 'fetch db data'
  id = window.location.pathname.split('/')[2]
  url = '/v1/projects/' + id
  $.ajax
    url:url
    dataType:'json'
    success: (d) ->
      d = d[0]
      console.log d.tags
      $('#Project_title').val(d.projectTitle) if d.projectTitle
      $('#Project_shortdescription').val(d.short) if d.short
      $('#Project_description').val(d.description) if d.description
      $('#launched').val(d.launched) if d.launched
      console.log d.featured
      $('#Project_featured').attr('checked','checked') if d.featured == 'true'
      console.log d.sticky
      $('#Project_sticky').attr('checked','checked') if d.sticky == 'true'
      console.log d.inLab
      $('#Project_inlab').attr('checked','checked') if d.inLab == 'true'

      console.log 'show media'
      console.log d.media
      mediaRows = d.media.length
      url = '/v1/projects/' + id + '/media/'
      $(d.media).each ->
        # refactor to iterate infinitely
        console.log this
        $('.media-obj-table tbody tr td').eq(0).append(this.format)
        $('.media-obj-table tbody tr td').eq(1).append(this.executionType)
        $('.media-obj-table tbody tr td').eq(2).append(this.title)
        $('.media-obj-table tbody tr td').eq(3).append(this.link)
        $('.media-obj-table tbody tr td').eq(4).append(this.height)
        $('.media-obj-table tbody tr td').eq(5).append(this.width)

      currentRows = $('.media-items tbody>tr').length
      $('.media-items tbody>tr').clone()
      emptyRow = $('.media-items tbody>tr').clone()
      $('.media-items tbody').append(emptyRow) for i in [0..mediaRows - currentRows]
  url = '/v1/tags'
  glob.tagObj = []
  id = window.location.pathname.split('/')[2]
  $.ajax
    url:url
    success: (d) ->
      glob.tagObj = []
      $(d).each ->
        projectId = this.project.toString()
        glob.tagObj.push this.tag if id == projectId
      console.log glob.tagObj
      $('#Project_tags').val(glob.tagObj).tagsInput()# }}}


populateData() if $('#project-form').length
populateData() if $('#list-project-wrap').length


$('body').on 'click','.del', (e) ->
  thisId = $(this).prev().attr('href').split('/')[2]# {{{
  console.log thisId
  url = '/v1/projects/' + thisId
  $.ajax
    url:url
    type:'delete'
    success: ->
      console.log 'gone'
      $('#all-projects').empty()
      window.populateData()# }}}

putFormData = ->
    formData = $('#project-form').serializeArray()# {{{
    formObj =
        'form':formData
        'media': glob.json
        'awards':glob.json2
        'links':glob.json3
    request = $.ajax
        url:'http://url'
        data:formObj
        dataType:'json'

    request.done ->
        window.location '/success/'
    request.fail ->
        # alert 'failed to submit form'
        alert 'new project has been submitted'
        window.location = '/'# }}}

submitForm = ->
    formData = $('#project-form').serializeArray()# {{{
    formObj =
        'form':formData
        'media': glob.json
        'awards':glob.json2
        'links':glob.json3
    request = $.ajax
        url:'http://url'
        data:formObj
        dataType:'json'

    request.done ->
        window.location '/success/'
    request.fail ->
        # alert 'failed to submit form'
        alert 'new project has been submitted'
        window.location = '/'# }}}

$('form').submit (e) ->
    console.log 'find type'
    e.preventDefault()
    modifyData = window.location.pathname.split('/')[1]
    submitFormData = ->
      console.log 'submitFormData'
      projectTitle = $('#Project_title').val()
      short = $('#Project_shortdescription').val()
      description = $('#Project_description').val()
      launched = $('#launched').val()
      featured = $('#Project_featured').is(':checked')
      console.log parseInt(featured)
      sticky = $('#Project_sticky').is(':checked')
      inLab = $('#Project_inlab').is(':checked')
      tags = $('#Project_tags').val()
      window.glob.addTags()
      url = '/v1/projects/' + projectTitle + '?description=' + description + '&short=' + short + '&launched=' + launched + '&featured=' + featured + '&sticky=' + sticky + '&inLab=' + inLab
      console.log url
    updateData = ->
      projectTitle = $('#Project_title').val()
      short = $('#Project_shortdescription').val()
      description = $('#Project_description').val()
      launched = $('#launched').val()
      featured = $('#Project_featured').is(':checked')
      console.log parseInt(featured)
      sticky = $('#Project_sticky').is(':checked')
      inLab = $('#Project_inlab').is(':checked')
      tags = $('#Project_tags').val()
      window.glob.addTags()
      id = window.location.pathname.split('/')[2]

      deleteMediaObj = ->
        url = '/v1/projects/' + id + '/media'# {{{
        $.ajax
          url:url
          type:'delete'
      deleteMediaObj()# }}}

      createMediaObj = ->
        url = '/v1/projects/' + id + '/media/' + glob.json[0][4].value + '?title=' + glob.json[0][2].value + '&exec=' + glob.json[0][3].value + '&height=' + glob.json[0][6].value + '&width=' + glob.json[0][5].value + '&link=' + glob.json[0][8]# {{{
        console.log url
        $.ajax
          url:url
          type:'post'
          success: ->
            console.log 'done fetching'
      createMediaObj()# }}}

      updateMediaObj = ->
        url = '/v1/projects/' + window.location.pathname.split('/')[2] + '/' + projectTitle + '?description=' + description + '&short=' + short + '&launched=' + launched + '&featured=' + featured + '&sticky=' + sticky + '&inLab=' + inLab# {{{
        console.log url
        $.ajax
          url:url
          type:'put'
          success: (d) ->
            console.log d
      updateMediaObj()# }}}

      alert 'project updated'
      #window.location = '/listProject/'
      console.log 'add/fetch media obj'
    postData = ->
      alert 'project added'
      projectTitle = $('#Project_title').val()
      short = $('#Project_shortdescription').val()
      description = $('#Project_description').val()
      launched = $('#launched').val()
      featured = $('#Project_featured').is(':checked')
      console.log parseInt(featured)
      sticky = $('#Project_sticky').is(':checked')
      inLab = $('#Project_inlab').is(':checked')
      tags = $('#Project_tags').val()
      url = '/v1/projects/' + projectTitle + '?description=' + description + '&short=' + short + '&launched=' + launched + '&featured=' + featured + '&sticky=' + sticky + '&inLab=' + inLab
      console.log url
      $.ajax
        url:url
        type:'post'
        success: (d) ->
          console.log d.id
          console.log 'post success'
          window.glob.addTags()
          window.location = '/listProject/'

    console.log modifyData
    updateData() if modifyData == 'editProject'
    postData() if modifyData == 'addProject'


    ### show proper modal and set data mode ###
$ ->
    showModal = ->

      types = ['media', 'awards', 'links']

      $('.table-striped').eq(0).on 'click', '.icon-pencil', ->
        $('#' + types[0] + '-modal').modal 'show'
        $('#' + types[0] + '-modal').attr 'data-mode', 'edit'
      $('.table-striped').eq(1).on 'click', '.icon-pencil', ->
        $('#' + types[1] + '-modal').modal 'show'
        $('#' + types[1] + '-modal').attr 'data-mode', 'edit'
      $('.table-striped').eq(2).on 'click', '.icon-pencil', ->
        $('#' + types[2] + '-modal').modal 'show'
        $('#' + types[2] + '-modal').attr 'data-mode', 'edit'

    showModal()


window.glob = window.glob || []
### parse (table index, json data) -> ###
glob.parse = (table,json)->
  td = $($('.table-striped')[table]).find('tr').eq(1).children 'td'
  trFirst = $($('.table-striped')[table]).find('tbody').eq(0).find('tr')[0]
  tr = $($('.table-striped')[table]).find('tbody').eq(0).find 'tr'

  ### create rows for json items ###
  reduceLength = glob.json.length - 1 && reduceLength2 = glob.json2.length - 1 && reduceLength3 = glob.json3.length - 1 if glob.json.length > 0
  reduceLen = glob.json.length - 2 && reduceLen2 = glob.json2.length - 2 && reduceLen3 = glob.json3.length - 2 if glob.json.length > 1
  createRows = $(trFirst).clone().insertAfter(trFirst) for i in [0..reduceLen] if table == 0
  createRows = $(trFirst).clone().insertAfter(trFirst) for i in [0..reduceLen2] if table == 1
  createRows = $(trFirst).clone().insertAfter(trFirst) for i in [0..reduceLen3] if table == 2

  $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(0).append(json[i][4].value) &&
  $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(1).append(json[i][3].value) &&
  $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(2).append(json[i][2].value) &&
  $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(3).append(json[i][7].value) &&
  $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(4).append(json[i][5].value) &&
  $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(5).append(json[i][6].value) &&
  $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(6).append(json[i][8].value) for i in [0..reduceLength] if table == 0

  $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(0).append(json[i][2].value) &&
  $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(1).append(json[i][3].value) &&
  $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(2).append(json[i][4].value) &&
  $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(3).append(json[i][5].value) for i in [0..reduceLength2] if table == 1

  $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(0).append(json[i][0].value) &&
  $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(1).append(json[i][1].value) for i in [0..reduceLength3] if table == 2

### populate fields with data for edit ###
$ ->

  $('.table-striped').on 'click', '.icon-pencil', ->
    type = $(this).parents('.table-striped').data 'type'
    i = $(this).parents('tr').index()

    media = ->
        json = glob.json
        # set data-item for table type
        $('#media-modal').attr('data-item',i)
        $('#title').val json[i][2].value
        $('#height').val json[i][5].value
        $('#width').val json[i][6].value
    media() if type == 'media'

    awards = ->
        json = glob.json2
        $('#awards-modal').attr('data-item',i)
        $("#name").val json[i][2].value
        $("#badge").val json[i][5].value
    awards() if type == 'awards'

    links = ->
        json = glob.json3
        $('#links-modal').attr('data-item',i)
        $('#links').val json[i][0].value
        $('#url2').val json[i][1].value
    links() if type == 'links'

$ ->
  ### add remove ###
  $('.table-striped').on 'click', '.icon-remove', ->
    i = $(this).parents('tr').index()
    type = $(this).parents('.table-striped').attr('data-type')
    $('#media-modal,#awards-modal,#links-modal').attr('data-mode','')
    json = glob.json if type == 'media'
    json = glob.json2 if type == 'awards'
    json = glob.json3 if type == 'links'
    # remove json object
    json.splice(i,1)
    glob.showUpdated 'media' if type == 'media'
    glob.showUpdated 'awards' if type == 'awards'
    glob.showUpdated 'links' if type == 'links'

### clear fields when creating new item ###
$ ->
    $('.icon-plus-sign').click ->
      $(this).parent().parent().parent().removeAttr 'data-item'
      $('#media-modal,#links-modal,#awards-modal').attr 'data-mode','add'
      $('.modal-body input,.modal-body textarea').val ''
      $('#r1').val('yes')
      $('#r2').val('no')

### update json data on edit done ###
$ ->
  $('#media-modal,#awards-modal,#links-modal').on 'click', '.btn.secondary', ->
    regex = /[0-9]/
    formId = $(this).parents('form').attr 'id'
    formNum = parseInt formId.match(regex)
    i = $('#media-modal').attr 'data-item' if formNum == 0
    i = $('#awards-modal').attr 'data-item' if formNum == 1
    i = $('#links-modal').attr 'data-item' if formNum == 2
    json = glob.json if formNum == 0
    json = glob.json2 if formNum == 1
    json = glob.json3 if formNum == 2
    updateData = ->
        json[i][2].value = $('#title').val()
        json[i][5].value = $('#height').val()
        json[i][6].value = $('#width').val()
        json[i][7].value = $('#link').val()
    if $('#media-modal').attr('data-mode') == 'edit' and formNum == 0
      updateData()

    updateData2 = ->
        json[i][2].value = $('#name').val()
        json[i][5].value = $('#badge').val()
    if $('#awards-modal').attr('data-mode') == 'edit' and formNum == 1
      updateData2()

    updateData3 = ->
        json[i][0].value = $('#links').val()
        json[i][1].value = $('#url2').val()
    if $('#links-modal').attr('data-mode') == 'edit' and formNum == 2
      updateData3()

    glob.showUpdated 'media' if formNum == 0
    glob.showUpdated 'awards' if formNum == 1
    glob.showUpdated 'links' if formNum == 2

### update table data ###
glob.json = []
glob.json2 = []
glob.json3 = []
glob.showUpdated = (table) ->
  refill = (num,tds) ->
    icons = $('.table-striped').eq(num).find('tbody>tr>td').last().contents()
    $('.table-striped').eq(num).find('tbody').empty().append '<tr>'

    for td in tds
      $('.table-striped').eq(num).find('tbody>tr').append '<td>'
      $('.table-striped').eq(num).find('tbody>tr').each ->
        $(this).find('td').last().append icons

  media = ->
    num = 0
    tds = [1..8]
    refill(num,tds)
  media() if table == 'media'
  awards = ->
    num = 1
    tds = [1..5]
    refill(num,tds)
  awards() if table == 'awards'
  links = ->
    num = 2
    tds = [1..3]
    refill(num,tds)
  links() if table == 'links'
  thisJson = $($('form')[1]).serializeArray()
  thisJson2 = $($('form')[2]).serializeArray()
  thisJson3 = $($('form')[3]).serializeArray()
  console.log glob.json if $('#media-modal').attr('data-mode') == 'add' and table == 'media'
  glob.json.push(thisJson) if $('#media-modal').attr('data-mode') == 'add' and table == 'media'
  glob.json2.push(thisJson2) if $('#awards-modal').attr('data-mode') == 'add' and table == 'awards'
  glob.json3.push(thisJson3) if $('#links-modal').attr('data-mode') == 'add' and table == 'links'
  glob.parse(0,glob.json) if table == 'media'
  glob.parse(1,glob.json2) if table == 'awards'
  glob.parse(2,glob.json3) if table == 'links'

