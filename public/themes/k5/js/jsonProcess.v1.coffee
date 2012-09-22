# this script uses custom json objects
submitForm = ->
    formData = $('#project-form').serializeArray()
    formObj =
        'form':formData
        'media':jsonMedia
        'awards':jsonAwards
        'links':jsonLinks
    request = $.ajax
        url:'http://url'
        data:formObj
        dataType:'json'

    request.done ->
        window.location '/success/'
    request.fail ->
        alert 'failed to submit form'

$('form').submit (e) ->
    e.preventDefault()
    submitForm()

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

jsonMedia =
    "items": [

            "title": "item title"
            "execution": "execution type"
            "format": "item format"
            "width": "item width"
            "height": "item height"
            "link": "item link"
            "carousel": true
            "description": "item description"
        ,
            "title": "item title2"
            "execution": "execution type"
            "format": "item format"
            "width": "item width"
            "height": "item height"
            "link": "item link"
            "carousel": true
            "description": "item description"
        ,
            "title": "item title3"
            "execution": "execution type"
            "format": "item format"
            "width": "item width"
            "height": "item height"
            "link": "item link"
            "carousel": true
            "description": "item description"
        ,
            "title": "item title4"
            "execution": "execution type"
            "format": "item format"
            "width": "item width"
            "height": "item height"
            "link": "item link"
            "carousel": true
            "description": "item description"
    ]

jsonAwards =
    "items": [
      "name":"name"
      "url":"url"
      "year":"year"
      "badge":"badge"
    ,
      "name":"name"
      "url":"url"
      "year":"year"
      "badge":"badge"
    ]

jsonLinks =
    "items": [
      "text":"text"
      "url":"url"
    ]

glob = {}
### parse (table index, json data) -> ###
glob.parse = (table,json)->
  td = $($('.table-striped')[table]).find('tr').eq(1).children 'td'
  trFirst = $($('.table-striped')[table]).find('tbody').eq(0).find('tr')[0]
  tr = $($('.table-striped')[table]).find('tbody').eq(0).find 'tr'
  reduceLength = json.items.length - 1
  reduceLen2 = json.items.length - 2 if json.items.length > 1
  ### create rows for json items ###
  createRows = $(trFirst).clone().insertAfter(trFirst) for i in [0..reduceLen2]
  $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(0).append(json.items[i].format) &&
  $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(1).append(json.items[i].execution) &&
  $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(2).append(json.items[i].title) &&
  $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(3).append(json.items[i].link) &&
  $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(4).append(json.items[i].height) &&
  $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(5).append(json.items[i].width) &&
  $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(6).append(json.items[i].carousel) for i in [0..reduceLength]

  $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(0).append(json.items[i].name) &&
  $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(1).append(json.items[i].url) &&
  $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(2).append(json.items[i].year) &&
  $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(3).append(json.items[i].badge) for i in [0..reduceLength]

  $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(0).append(json.items[i].text) &&
  $($('.table-striped tbody').eq(table).find('tr')[i]).children('td').eq(1).append(json.items[i].url2) for i in [0..reduceLength]

### populate fields with data for edit ###
$ ->

  $('.table-striped').on 'click', '.icon-pencil', ->
    type = $(this).parents('.table-striped').data 'type'
    i = $(this).parents('tr').index()

    media = ->
        json = jsonMedia if type == 'media'

        # set data-item for table type
        $('#media-modal').attr('data-item',i) if type == 'media'
        $('#title').val json.items[i].title
        $('#height').val json.items[i].height
        $('#width').val json.items[i].width
        $('#link').val json.items[i].link
        $('#description').val json.items[i].description
    media() if type == 'media'

    awards = ->
        json = jsonAwards if type == 'awards'
        $('#awards-modal').attr('data-item',i) if type == 'awards'
        $("#name").val json.items[i].name
        $('#url').val json.items[i].url
        $('#year').val json.items[i].year
        $('#badge').val json.items[i].badge
    awards() if type == 'awards'

    links = ->
        json = jsonLinks if type == 'links'
        $('#links-modal').attr('data-item',i) if type == 'links'
        $('#links').val json.items[i].text
        $('#url2').val json.items[i].url
    links() if type == 'links'

$ ->
    # todo: add remove for all tables
  $('.table-striped').on 'click', '.icon-remove', ->
    i = $(this).parents('tr').index()
    type = $(this).parents('.table-striped').attr('data-type')
    json = jsonMedia if type == 'media'
    json = jsonAwards if type == 'awards'
    json = jsonLinks if type == 'links'
    # remove json object
    json.items.splice(i,1)
    glob.showUpdated 'media' if type == 'media'
    glob.showUpdated 'awards' if type == 'awards'
    glob.showUpdated 'links' if type == 'links'

### clear fields when creating new item ###
$ ->
    $('.icon-plus-sign').click ->
      $(this).parent().parent().parent().removeAttr 'data-item'
      $('#media-modal,#links-modal,#awards-modal').attr 'data-mode','add'
      $('.modal-body input,.modal-body textarea').val ''

### update json data on edit done ###
$ ->
  $('#media-modal,#awards-modal,#links-modal').on 'click', '.save-media', ->
    i = $('#media-modal').attr 'data-item'
    json = jsonMedia
    updateData = ->
        json.items[i].title = $('#title').val()
        json.items[i].height = $('#height').val()
        json.items[i].width = $('#width').val()
        json.items[i].link = $('#link').val()
        json.items[i].description = $('#description').val()

    createNew = ->
        newObj =
            'title':$('#title').val()
            'height':$('#height').val()
            'width':$('#width').val()
            'link':$('#link').val()
            'description':$('#description').val()
        json.items.push newObj
    if $('#media-modal').attr('data-mode') == 'edit'
      updateData()
    if $('#media-modal').attr('data-mode') == 'add'
      createNew()

    glob.showUpdated 'media'

  $('#awards-modal').on 'click', '.save-awards', ->
    i = $('#awards-modal').attr 'data-item'
    json = jsonAwards
    updateData = ->
        json.items[i].name = $('#name').val()
        json.items[i].url = $('#url').val()
        json.items[i].year = $('#year').val()
        json.items[i].badge = $('#badge').val()
    createNew = ->
        newObj =
            'name':$('#name').val()
            'url':$('#url').val()
            'year':$('#year').val()
            'badge':$('#badge').val()
        json.items.push newObj
    if $('#awards-modal').attr('data-mode') == 'edit'
      updateData()
    if $('#awards-modal').attr('data-mode') == 'add'
      createNew()

    glob.showUpdated 'awards'

  $('#links-modal').on 'click', '.save-links', ->
    i = $('#links-modal').attr 'data-item'
    json = jsonLinks
    updateData = ->
        json.items[i].text = $('#links').val()
        json.items[i].url = $('#url2').val()

    createNew = ->
        newObj =
            'text':$('#links').val()
            'url':$('#url2').val()
        json.items.push newObj
    if $('#links-modal').attr('data-mode') == 'edit'
      updateData()
    if $('#links-modal').attr('data-mode') == 'add'
      createNew()

    glob.showUpdated 'links'

### execute parse to populate data ###
$ ->
  glob.parse(0,jsonMedia)
  glob.parse(1,jsonAwards)
  glob.parse(2,jsonLinks)

### update table data ###
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

  glob.parse(0, jsonMedia) if table == 'media'
  glob.parse(1, jsonAwards) if table == 'awards'
  glob.parse(2, jsonLinks) if table == 'links'


