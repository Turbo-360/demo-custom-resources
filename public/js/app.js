/* Your custom app logic goes here */
$(function(){
	var companies = window.__INITIAL__
	if (companies == null) // no intial data
		return

	var companiesMap = {}
	var selectedCompany = null

	companies.forEach(function(company, i){
		companiesMap[company.id] = company
		$('#btn-edit-'+company.id).click(function(event){
			event.preventDefault()
			selectedCompany = companiesMap[company.id]
			updateCompany(company.id)
		})

	})

	var updateCompany = function(id){
		var company = companiesMap[id]
		if (company == null)
			return

		selectedCompany = company
		$('#update-name').val(company.name)
		$('#update-ceo').val(company.ceo)
		$('#update-industry').val(company.industry)
		$('#update-box').css('display', '')
	}

	$('#btn-update').click(function(event){
		event.preventDefault()
		var updatedCompany = {
			name: $('#update-name').val(),
			ceo: $('#update-ceo').val(),
			industry: $('#update-industry').val()
		}

		$.ajax({
			url : '/custom/' + selectedCompany.id,
			type: 'PUT',
			data : updatedCompany,
			success: function(data, textStatus, jqXHR){
				console.log('company updated: ' + JSON.stringify(data))
				alert('Company Updated')
			},
			error: function (jqXHR, textStatus, err){
				alert('Error: ' + err.message)
			}
		})
	})

	$('#btn-delete').click(function(event){
		event.preventDefault()
		if (selectedCompany == null)
			return

		console.log('DELETE Company: ' + JSON.stringify(selectedCompany))
		$.ajax({
			url : '/custom/' + selectedCompany.id,
			type: 'DELETE',
			success: function(data, textStatus, jqXHR){
				alert('Company Delete. Refresh page to update list.')
			},
			error: function (jqXHR, textStatus, err){
				alert('Error: ' + err.message)
			}
		})
	})
})